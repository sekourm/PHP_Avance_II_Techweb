<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * techSubTasks
 */
class techSubTasks
{
    /**
     * @var guid
     */
    private $id;

    /**
     * @var string
     */
    private $description;

    /**
     * @var \AppBundle\Entity\techTasks
     */
    private $subTasksByTasks;


    /**
     * Get id
     *
     * @return guid 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return techSubTasks
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set subTasksByTasks
     *
     * @param \AppBundle\Entity\techTasks $subTasksByTasks
     * @return techSubTasks
     */
    public function setSubTasksByTasks(\AppBundle\Entity\techTasks $subTasksByTasks = null)
    {
        $this->subTasksByTasks = $subTasksByTasks;

        return $this;
    }

    /**
     * Get subTasksByTasks
     *
     * @return \AppBundle\Entity\techTasks 
     */
    public function getSubTasksByTasks()
    {
        return $this->subTasksByTasks;
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
     * @param \AppBundle\Entity\techSubTasksByUsers $tasksBySubTasks
     * @return techSubTasks
     */
    public function addTasksBySubTask(\AppBundle\Entity\techSubTasksByUsers $tasksBySubTasks)
    {
        $this->tasksBySubTasks[] = $tasksBySubTasks;

        return $this;
    }

    /**
     * Remove tasksBySubTasks
     *
     * @param \AppBundle\Entity\techSubTasksByUsers $tasksBySubTasks
     */
    public function removeTasksBySubTask(\AppBundle\Entity\techSubTasksByUsers $tasksBySubTasks)
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
    /**
     * @var boolean
     */
    private $active = 0;

    /**
     * Set active
     *
     * @param boolean $active
     * @return techSubTasks
     */
    public function setActive($active)
    {
        $this->active = $active;

        return $this;
    }

    /**
     * Get active
     *
     * @return boolean 
     */
    public function getActive()
    {
        return $this->active;
    }
    /**
     * @var boolean
     */
    private $checked = 0;


    /**
     * Set checked
     *
     * @param boolean $checked
     * @return techSubTasks
     */
    public function setChecked($checked)
    {
        $this->checked = $checked;

        return $this;
    }

    /**
     * Get checked
     *
     * @return boolean 
     */
    public function getChecked()
    {
        return $this->checked;
    }
}
