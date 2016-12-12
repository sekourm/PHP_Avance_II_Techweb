<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * techTasks
 */
class techTasks
{
    /**
     * @var int
     */
    private $id;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }
    /**
     * @var string
     */
    private $name;

    /**
     * @var \AppBundle\Entity\techCategories
     */
    private $tasksByCategories;


    /**
     * Set name
     *
     * @param string $name
     * @return techTasks
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set tasksByCategories
     *
     * @param \AppBundle\Entity\techCategories $tasksByCategories
     * @return techTasks
     */
    public function setTasksByCategories(\AppBundle\Entity\techCategories $tasksByCategories = null)
    {
        $this->tasksByCategories = $tasksByCategories;

        return $this;
    }

    /**
     * Get tasksByCategories
     *
     * @return \AppBundle\Entity\techCategories 
     */
    public function getTasksByCategories()
    {
        return $this->tasksByCategories;
    }
    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $tasksBySubTasks;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->tasksBySubTasks = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add tasksBySubTasks
     *
     * @param \AppBundle\Entity\techSubTasks $tasksBySubTasks
     * @return techTasks
     */
    public function addTasksBySubTask(\AppBundle\Entity\techSubTasks $tasksBySubTasks)
    {
        $this->tasksBySubTasks[] = $tasksBySubTasks;

        return $this;
    }

    /**
     * Remove tasksBySubTasks
     *
     * @param \AppBundle\Entity\techSubTasks $tasksBySubTasks
     */
    public function removeTasksBySubTask(\AppBundle\Entity\techSubTasks $tasksBySubTasks)
    {
        $this->tasksBySubTasks->removeElement($tasksBySubTasks);
    }

    /**
     * Get tasksBySubTasks
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getTasksBySubTasks()
    {
        return $this->tasksBySubTasks;
    }
}
